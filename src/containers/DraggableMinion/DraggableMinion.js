import React, { Component, PropTypes } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource as dragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { Minion } from 'components';

export class DraggableMinion extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, card } = this.props;
    const sharedStyles = require('components/shared/styles.scss');

    return connectDragSource(
      <div className={sharedStyles.fullHeight} style={{ opacity: isDragging ? 0 : 1 }}>
        <Minion card={card} />
      </div>
    );
  }
}

const minionSource = {
  beginDrag(props) {
    return {
      card: props.card,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

export default dragSource('MINION', minionSource, collect)(DraggableMinion);
