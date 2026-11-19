export type DialogueEnd = {
  event: string
}

export type DialogueChoice = {
  id: string
  text: string
  next?: string
  end?: DialogueEnd
  event?: string
}

export type DialogueNode = {
  speaker: string
  text: string
  next?: string
  choices?: DialogueChoice[]
  end?: DialogueEnd
}

export type DialogueScript = {
  id: string
  startNodeId: string
  nodes: Record<string, DialogueNode>
}

export type Speakers = Record<string, string>

function nodeTerminalKeys(node: DialogueNode): string[] {
  const keys: string[] = []
  if (node.next !== undefined) keys.push('next')
  if (node.choices !== undefined) keys.push('choices')
  if (node.end !== undefined) keys.push('end')
  return keys
}

function choiceTerminalKeys(choice: DialogueChoice): string[] {
  const keys: string[] = []
  if (choice.next !== undefined) keys.push('next')
  if (choice.end !== undefined) keys.push('end')
  return keys
}

function nodeHasEnd(node: DialogueNode): boolean {
  if (node.end !== undefined) return true
  if (node.choices) {
    return node.choices.some((choice) => choice.end !== undefined)
  }
  return false
}

function outgoingNodeIds(node: DialogueNode): string[] {
  if (node.next !== undefined) return [node.next]
  if (node.choices) {
    return node.choices.flatMap((choice) =>
      choice.next !== undefined ? [choice.next] : [],
    )
  }
  return []
}

function canReachEnd(
  script: DialogueScript,
  fromNodeId: string,
): boolean {
  const visited = new Set<string>()
  const stack = [fromNodeId]

  while (stack.length > 0) {
    const nodeId = stack.pop()!
    if (visited.has(nodeId)) continue
    visited.add(nodeId)

    const node = script.nodes[nodeId]
    if (!node) continue
    if (nodeHasEnd(node)) return true

    for (const nextId of outgoingNodeIds(node)) {
      if (!visited.has(nextId)) stack.push(nextId)
    }
  }

  return false
}

function reachableFromStart(script: DialogueScript): Set<string> {
  const visited = new Set<string>()
  const stack = [script.startNodeId]

  while (stack.length > 0) {
    const nodeId = stack.pop()!
    if (visited.has(nodeId)) continue
    if (!(nodeId in script.nodes)) continue
    visited.add(nodeId)

    for (const nextId of outgoingNodeIds(script.nodes[nodeId]!)) {
      if (!visited.has(nextId)) stack.push(nextId)
    }
  }

  return visited
}

export function validateDialogueScript(
  script: DialogueScript,
  speakers: Speakers,
): string[] {
  const errors: string[] = []
  const nodeIds = Object.keys(script.nodes)

  if (!(script.startNodeId in script.nodes)) {
    errors.push(`startNodeId not found: ${script.startNodeId}`)
  }

  for (const nodeId of nodeIds) {
    const node = script.nodes[nodeId]!
    const terminals = nodeTerminalKeys(node)

    if (terminals.length === 0) {
      errors.push(
        `node ${nodeId} must have exactly one of next, choices, or end`,
      )
    } else if (terminals.length > 1) {
      errors.push(
        `node ${nodeId} must have exactly one of next, choices, or end`,
      )
    }

    if (!(node.speaker in speakers)) {
      errors.push(`unknown speaker on node ${nodeId}: ${node.speaker}`)
    }

    if (node.next !== undefined && !(node.next in script.nodes)) {
      errors.push(`next not found from node ${nodeId}: ${node.next}`)
    }

    if (node.choices !== undefined) {
      if (node.choices.length === 0) {
        errors.push(`node ${nodeId} choices must not be empty`)
      }

      const seenChoiceIds = new Set<string>()
      for (const choice of node.choices) {
        if (seenChoiceIds.has(choice.id)) {
          errors.push(
            `duplicate choice id on node ${nodeId}: ${choice.id}`,
          )
        }
        seenChoiceIds.add(choice.id)

        const choiceTerminals = choiceTerminalKeys(choice)
        if (choiceTerminals.length !== 1) {
          errors.push(
            `choice ${choice.id} on node ${nodeId} must have exactly one of next or end`,
          )
        }

        if (
          choice.next !== undefined &&
          !(choice.next in script.nodes)
        ) {
          errors.push(
            `next not found from choice ${choice.id} on node ${nodeId}: ${choice.next}`,
          )
        }
      }
    }
  }

  if (script.startNodeId in script.nodes) {
    for (const nodeId of nodeIds) {
      if (!canReachEnd(script, nodeId)) {
        errors.push(`node cannot reach an end: ${nodeId}`)
      }
    }

    const reachable = reachableFromStart(script)
    for (const nodeId of nodeIds) {
      if (!reachable.has(nodeId)) {
        errors.push(`node unreachable from start: ${nodeId}`)
      }
    }
  }

  return errors
}
