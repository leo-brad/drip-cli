import chalk from 'chalk';

function formateOperate(title) {
  return '[' + chalk.bold('operate') + '] ' + title + ': ';
}

class Wait {
  constructor(title, status) {
    this.operate = formateOperate(title);
    this.status = status;
    this.count = 0;
    this.lines = [];
    this.col = process.stdout.columns;
    this.step = this.step.bind(this);
  }

  start() {
    this.id = setInterval(this.step, 1000 / 29);
  }

  step() {
    const { operate, status, count, } = this;
    if (!status.done) {
      const col = process.stdout.columns;
      const all = col - operate.length + 17;
      if (count > all) {
        this.count = 0;
      }
      const spot = new Array(count);
      console.log(
        operate + spot.fill('.').join('')
      );
      this.count += 1;
    } else {
      clearInterval(this.id);
    }
  }
}

export default Wait;
