import '~/render/style/index.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Node from '~/render/script/component/Node';
import Emitter from '~/render/script/class/Emitter';

const data = [];
const emitter = new Emitter();
const share = {
  focus: true,
  emitter,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Node instance="[node]:node1" data={data} share={share} />);
