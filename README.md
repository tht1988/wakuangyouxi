# 挖矿游戏文件结构说明

## 项目结构

```
挖矿游戏/
├── game.js           # 主游戏逻辑
├── index.html        # 游戏页面
├── style.css         # 游戏样式
├── config/           # 配置文件
│   └── chineseNames.js  # 中文名称映射
├── data/             # 游戏数据
│   ├── affixes/      # 装备词缀数据
│   ├── crafting/     # 制作相关数据
│   │   └── furnace-recipes.json  # 熔炉配方
│   ├── images/       # 图片资源
│   ├── loot/         # 掉落系统数据
│   ├── minerals/     # 矿物相关数据
│   ├── shop/         # 商店相关数据
│   └── slots/        # 插片系统数据
│       ├── slot-config.js    # 插片配置
│       └── slot-mapping.js   # 插片映射
├── saves/            # 存档文件
├── docs/             # 文档
├── temp/             # 临时文件
├── backup/           # 备份文件
├── start_server.ps1  # 启动服务器脚本
└── http_server.py    # Python HTTP服务器
```

## 模块说明

### 核心文件
- **game.js**: 包含游戏的主要逻辑和功能
- **index.html**: 游戏的HTML页面结构
- **style.css**: 游戏的样式定义

### 数据文件夹 (data/)
- **affixes/**: 装备词缀相关数据
- **crafting/**: 制作台和熔炉配方
- **images/**: 游戏图片资源
- **loot/**: 掉落系统配置
- **minerals/**: 矿物属性和副产物配置
- **shop/**: 商店物品和配置
- **slots/**: 插片系统配置和映射

### 配置文件夹 (config/)
- **chineseNames.js**: 中文名称映射，用于将内部名称转换为中文显示

### 存档文件夹 (saves/)
- 存储游戏存档文件

### 文档文件夹 (docs/)
- 游戏相关文档和说明

## 如何运行

1. 确保安装了Python
2. 运行 `start_server.ps1` 脚本启动本地服务器
3. 在浏览器中访问 `http://localhost:8000`

## 如何更新内容

### 添加新矿物
1. 修改 `data/minerals/` 下的矿物配置文件

### 更新副产物
1. 修改 `data/minerals/byproducts.js` 文件

### 管理商店物品
1. 修改 `data/shop/shop_items.js` 文件

### 优化配方
1. 制作台配方：修改 `data/crafting/workshop_recipes.js`
2. 熔炉配方：修改 `data/crafting/furnace-recipes.json`

## 注意事项

- 所有文件路径引用已更新，确保游戏能正确加载资源
- 游戏功能和样式保持不变
- 如需修改游戏逻辑，请编辑 `game.js` 文件
