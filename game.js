// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("你的第一个线索是：在古老的图书馆中寻找答案。");
            }, 1000);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("解码后的线索指向了图书馆的地下室。");
            }, 1000);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`在地下室，你发现了一个隐藏的箱子。`);
            }, 1000);
        });
    }

    static solveRiddle(riddle) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("答案是：时间。");
            }, 1000);
        });
    }

    static findSecretPassageway(location) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`在箱子下，你找到了一个秘密通道。`);
            }, 1000);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜你找到了宝藏！");
            }, 1000);
        });
    }
}

// 游戏状态管理
const gameState = {
    step: 0,
    clue: null,
    location: null,
    box: null,
    riddle: null,
    secretPassageway: null,
    treasure: null,
    choice: null // 记录玩家的选择
};

// 定义结局
const endings = {
    7: "你选择了左边的路，最终找到了宝藏！",
    8: "你选择了右边的路，却迷失在森林中。",
    // ... 其他结局 ...
};

const imagePaths = {
    0: "images/start.jpg",
    1: "images/library.jpg",
    2: "images/basement.jpg",
    3: "images/choice.jpg",
    4: "images/choice.jpg", // 假设谜题步骤使用choice.jpg
    5: "images/choice.jpg", // 假设路径选择步骤使用choice.jpg
    6: "images/choice.jpg", // 假设其他步骤使用choice.jpg
    7: "images/choice.jpg", // 假设其他步骤使用choice.jpg
    8: "images/choice.jpg", // 假设其他步骤使用choice.jpg
    9: "images/basement.jpg", // 假设地下室步骤使用basement.jpg
    10: "images/treasureFound.jpg" // 假设宝藏步骤使用treasureFound.jpg
}

// 更新游戏状态并显示内容
async function updateGameState() {
    const elements = {
        message: document.getElementById('message'),
        choices: document.getElementById('choices'),
        startButton: document.getElementById('startButton'),
        nextButton: document.getElementById('nextButton'),
        retryButton: document.getElementById('retryButton'),
        locationImage: document.getElementById('locationImage')
    };

    // 清除之前的内容
    elements.message.innerText = '';
    elements.choices.innerHTML = '';

    try {
        switch(gameState.step) {
            case 0:
                elements.message.innerText = await TreasureMap.getInitialClue();
                elements.nextButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 1:
                elements.message.innerText = await TreasureMap.decodeAncientScript(gameState.clue);
                elements.nextButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 2:
                elements.message.innerText = await TreasureMap.searchTemple(gameState.location);
                elements.nextButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
                case 3:
                    const riddle = "什么东西越用越少？";
                    elements.message.innerText = `谜题: ${riddle}`;
                    elements.locationImage.src = imagePaths[gameState.step];
                    // 等待谜题显示
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    // 弹出对话框让玩家输入答案
                    const userAnswer = prompt("请输入你的答案：");
                    if (userAnswer === "时间") {
                        elements.message.innerText += `\n${await TreasureMap.solveRiddle(riddle)}`;
                        elements.nextButton.classList.remove('hidden');
                    } else {
                        elements.message.innerText += "\n答案错误，游戏结束。";
                        elements.retryButton.classList.remove('hidden');
                    }
                    break;
            case 4:
                elements.message.innerText = await TreasureMap.findSecretPassageway(gameState.location);
                elements.nextButton.classList.remove('hidden');
                gameState.step = 9; // 假设下一步是地下室
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 5:
                elements.message.innerText = await TreasureMap.openTreasureBox();
                elements.nextButton.classList.add('hidden');
                elements.retryButton.classList.remove('hidden');
                gameState.step = 10; // 假设下一步是宝藏
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 6: 
                // 新增的步骤，用于路径选择
                elements.message.innerText = "你遇到一个分叉路口。你选择哪条路？";
                elements.choices.innerHTML = `
                    <button class="choiceButton">左边的路</button>
                    <button class="choiceButton">右边的路</button> 
                `;
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 7:
                elements.message.innerText = endings[7];
                elements.retryButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 8:
                elements.message.innerText = endings[8];
                elements.retryButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 9: // 地下室
                elements.message.innerText = "你在地下室中找到了一个隐藏的箱子。";
                elements.nextButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
            case 10: // 宝藏
                elements.message.innerText = "恭喜你找到了宝藏！";
                elements.retryButton.classList.remove('hidden');
                elements.locationImage.src = imagePaths[gameState.step];
                break;
        }
        gameState.step++;
    } catch (error) {
        elements.message.innerText = `任务失败: ${error}`;
        elements.nextButton.classList.add('hidden');
        elements.retryButton.classList.remove('hidden');
    }
}

// 开始游戏
document.getElementById('startButton').addEventListener('click', () => {
    gameState.step = 0;
    gameState.clue = null;
    gameState.location = null;
    gameState.box = null;
    gameState.riddle = null;
    gameState.secretPassageway = null;
    gameState.treasure = null;
    gameState.choice = null; // 重置选择
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('nextButton').classList.remove('hidden');
    document.getElementById('retryButton').classList.add('hidden');
    updateGameState();
});

// 继续游戏
document.getElementById('nextButton').addEventListener('click', updateGameState);

// 重试游戏
document.getElementById('retryButton').addEventListener('click', () => {
    gameState.step = 0;
    gameState.clue = null;
    gameState.location = null;
    gameState.box = null;
    gameState.riddle = null;
    gameState.secretPassageway = null;
    gameState.treasure = null;
    gameState.choice = null; // 重置选择
    document.getElementById('retryButton').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden');
    updateGameState();
});


// 确保DOM完全加载后再执行脚本
document.addEventListener('DOMContentLoaded', () => {
    // 添加locationImage元素到HTML中
    const gameContainer = document.getElementById('game');
    const locationImage = document.createElement('img');
    locationImage.id = 'locationImage';
    locationImage.src = 'start.jpg';
    locationImage.alt = '游戏场景';
    gameContainer.insertBefore(locationImage, document.getElementById('choices'));
// 为每个按钮添加点击事件监听器
 document.querySelectorAll('.choiceButton').forEach(button => {
   button.addEventListener('click', (event) => {
   const choice = event.target.innerText;
  gameState.choice = choice; // 记录玩家的选择
// 根据玩家的选择更新游戏状态
  if (choice === '左边的路') {
      gameState.step = 7; // 假设路径A的下一步是步骤7
       } else if (choice === '右边的路') {
        gameState.step = 8; // 假设路径B的下一步是步骤8
          }
     updateGameState(); // 更新游戏状态
        });
            });
    // 初始化游戏状态
    gameState.step = 0;
    gameState.clue = null;
    gameState.location = null;
    gameState.box = null;
    gameState.riddle = null;
    gameState.secretPassageway = null;
    gameState.treasure = null;
    gameState.choice = null; // 重置选择

    // 隐藏重试和继续按钮
    document.getElementById('nextButton').classList.add('hidden');
    document.getElementById('retryButton').classList.add('hidden');

    // 启动游戏
    updateGameState();
});