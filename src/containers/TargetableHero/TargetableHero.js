import React, { Component, PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import { Hero } from 'components';

export class TargetableHero extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    health: PropTypes.number.isRequired,
  }

  render() {
    const { connectDropTarget, health } = this.props;

    return connectDropTarget(
      <div>
        <Hero health={health} />
      </div>
    );
  }
}

const heroTarget = {
  drop(props, monitor) {
    const minion = monitor.getItem().card;

    props.hitFace({
      damage: minion.attack,
    });
  },
};

function collect(connect) {
  return { connectDropTarget: connect.dropTarget() };
}

export default dropTarget('MINION', heroTarget, collect)(TargetableHero);
