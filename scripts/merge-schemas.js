const fs = require('fs');
const path = require('path');

function extractBlock(content, blockType) {
  const lines = content.split('\n');
  let block = [];
  let isInBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith(blockType)) {
      isInBlock = true;
    }
    if (isInBlock) {
      block.push(line);
      if (line.trim() === '}') {
        break;
      }
    }
  }
  return block.join('\n');
}

function removeConfigBlocks(content) {
  const lines = content.split('\n');
  let cleanedLines = [];
  let skip = false;

  for (const line of lines) {
    if (line.trim().startsWith('generator') || line.trim().startsWith('datasource')) {
      skip = true;
      continue;
    }
    if (skip && line.trim() === '}') {
      skip = false;
      continue;
    }
    if (!skip) {
      cleanedLines.push(line);
    }
  }
  return cleanedLines.join('\n');
}

function mergeSchemas() {
  // Read the main schema
  const mainSchemaPath = path.join(__dirname, '../prisma/schema.prisma');
  const mainSchema = fs.readFileSync(mainSchemaPath, 'utf8');
  
  // Extract generator and datasource blocks from main schema
  const generatorBlock = extractBlock(mainSchema, 'generator');
  const datasourceBlock = extractBlock(mainSchema, 'datasource');
  
  // Start with the config blocks
  let finalSchema = `${generatorBlock}\n\n${datasourceBlock}\n`;

  // List of schema files to merge
  const schemaFiles = ['user.prisma', 'novel.prisma', 'blog.prisma'];
  
  // Process each schema file
  schemaFiles.forEach(schemaFile => {
    const schemaPath = path.join(__dirname, '../prisma', schemaFile);
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Remove generator and datasource blocks from imported files
    const cleanedSchema = removeConfigBlocks(schema);
    
    finalSchema += '\n' + cleanedSchema;
  });

  // Write the final schema
  fs.writeFileSync(path.join(__dirname, '../prisma/schema.prisma.generated'), finalSchema);
  console.log('Schema files merged successfully!');
}

mergeSchemas(); 