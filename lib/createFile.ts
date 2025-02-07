import { writeFile } from 'fs/promises'

const tsContent = (name: string) => `
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function ${name}(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
    case 'POST':
    case 'PUT':    
    case 'DELETE':
    default:
      res.setHeader('Allow', [
        'GET',
        'POST',
        'PUT',
        'DELETE',
    ])
      return res.status(405).end(\`Method \${req.method} Not Allowed\`)
  }
}
`
const jsContent = (name: string) => `
export default async function ${name}(req,res) {

  switch (req.method) {
    case 'GET':
    case 'POST':
    case 'PUT':    
    case 'DELETE':
    default:
      res.setHeader('Allow', [
        'GET',
        'POST',
        'PUT',
        'DELETE',
    ])
      return res.status(405).end(\`Method \${req.method} Not Allowed\`)
  }
}
`

export const createFile = async (
  filePath: string,
  language: string
): Promise<void> => {
  const file = filePath.split('/').pop() as string //filename.extension
  const filename = file.split('.')[0] //filename
  if (language === 'ts') {
    await writeFile(filePath, tsContent(filename))
  }
  if (language === 'js') {
    await writeFile(filePath, jsContent(filename))
  }
}
