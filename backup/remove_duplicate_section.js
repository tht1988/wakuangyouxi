const fs = require('fs');
const path = 'f:\\游戏\\挖矿游戏\\game.js';

// 读取文件内容
let content = fs.readFileSync(path, 'utf8');

// 找到所有auto-mining-section的位置
const sectionRegex = /<div class="auto-mining-section">[\s\S]*?<\/div>/g;
const sections = content.match(sectionRegex);

if (sections && sections.length > 1) {
    // 计算每个section的起始和结束位置
    let startPositions = [];
    let endPositions = [];
    let match;
    while ((match = sectionRegex.exec(content)) !== null) {
        startPositions.push(match.index);
        endPositions.push(match.index + match[0].length);
    }
    
    // 删除最后一个auto-mining-section
    const lastStart = startPositions[startPositions.length - 1];
    const lastEnd = endPositions[endPositions.length - 1];
    
    // 确保只删除最后一个section，保留前面的
    content = content.substring(0, lastStart) + content.substring(lastEnd);
    
    // 写入修改后的内容
    fs.writeFileSync(path, content, 'utf8');
    console.log('已删除重复的auto-mining-section');
} else {
    console.log('未找到重复的auto-mining-section或只有一个section');
}
