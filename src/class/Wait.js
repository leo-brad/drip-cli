import chalk from 'chalk';

function formateOperate(operate) {
  return chalk.gray('[') + chalk.bold.rgb(150, 150, 150)(operate) + chalk.gray(']') + ' ' + chalk.bold(':');
}

function gradient(operate) {
  const ans = [];
  const splice = Math.floor(255 / operate.length);
  for (let i = 0; i < operate.length; i += 1) {
    const char = operate[i];
    const rate = (operate.length - i) * splice;
    ans.push(chalk.bold.rgb(rate, rate, rate)(char));
  }
  return ans.join('');
}

class Wait {
  constructor(operate, status) {
    this.operate = operate;
    this.status = status;
    this.lines = [];
    this.col = process.stdout.columns;
    this.count = Math.floor(this.col * 0.7);
    this.step = this.step.bind(this);
  }

  start() {
    this.id = setInterval(this.step, 1000 / 29);
  }

  step() {
    const { status, count, col, operate, } = this;
    if (!status.done) {
      const all = col - operate.length - 4;
      if (count >= all) {
        this.count = Math.floor(col * 0.7);
      }
      const spot = new Array(count);
      console.log(formateOperate(operate) + gradient(spot.fill('.').join('')));
      this.count += 1;
    } else {
      clearInterval(this.id);
    }
  }
}

export default Wait;
