import { createClient } from "@astrajs/collections"

const astraClient = await createClient({
  astraDatabaseId: '07c44884-24ac-41ac-bda8-e23aa8476cd4',
  astraDatabaseRegion: 'asia-south1',
  applicationToken: 'AstraCS:jIrmbYeEAPjXbNKTuyzZetZG:2c364352f4646341deba83f8d9ec883c9cb83ec628cd74302fe6d02462217eeb',
})

export {astraClient}