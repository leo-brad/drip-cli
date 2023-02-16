import chalk from 'chalk';

class Wait {
  constructor(title, status) {
    this.title = title;
    this.status = status;
    this.count = 0;
    this.col = process.stdout.columns;
    this.step = this.step.bind(this);
  }

  start() {
    this.id = setInterval(this.step, 1000 / 29);
  }

  step() {
    const { title, status, count, } = this;
    if (!status.done) {
      const col = process.stdout.columns;
      const all = col - title.length;
      if (count >= all) {
        this.count = 0;
      }
      console.clear();
      const spot = new Array(count);
      console.log(chalk.bold(title) + spot.fill('.').join(''));
      this.count += 1;
    } else {
      clearInterval(this.id);
    }
  }
}

export default Wait;
