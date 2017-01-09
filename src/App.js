import React, { Component } from 'react';
import Collapse from 'react-collapse';
import { chunk } from 'lodash';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };

    this.handleClick = this.handleClick.bind(this);
    this.primaryCollapseIndex = 0;
  }

  handleClick(id) {
    const viewportWidth = document.documentElement.clientWidth;
    const idIndex = this.props.data.findIndex(d => d.id === id);

    const selectedIndex = this.state.selectedIndex === idIndex ? -1 : idIndex;

    let columns = 1;
    if (viewportWidth > 400) columns = 2;
    if (viewportWidth > 600) columns = 3;

    this.setState({
      previousSelectedIndex: this.state.selectedIndex,
      selectedIndex,
      columns
    });
  }

  render() {
    const { data } = this.props;
    const { selectedIndex, previousSelectedIndex, columns } = this.state;
    const selectedItem = data[selectedIndex];
    const previousSelectedItem = data[previousSelectedIndex];

    const chunked = chunk(data, 6);

    const groups = chunked.map(group =>
      group.map((d, i) =>
        <div
          key={`link-${i}`}
          className={`link link-${i + 1}`}
          onClick={() => this.handleClick(d.id)}
        >{d.id}</div>
      )
    );

    const groupWithSelectedItemIndex = selectedIndex >= 0 ? selectedIndex / 6 | 0 : -1;
    const selectedIndexInGroup = selectedIndex % 6;

    const previousGroupWithSelectedItemIndex = previousSelectedIndex &&
      (previousSelectedIndex >= 0 ? previousSelectedIndex / 6 | 0 : -1);
    const previousSelectedIndexInGroup = previousSelectedIndex && previousSelectedIndex % 6;

    if (groupWithSelectedItemIndex === previousGroupWithSelectedItemIndex) {
      if ((previousSelectedIndexInGroup / columns | 0) !== (selectedIndexInGroup / columns | 0)) {
        // Same group. Different row.
        this.primaryCollapseIndex = (this.primaryCollapseIndex + 1) % 2;
      }
    } else {
      // Different group.
      this.primaryCollapseIndex = 0;
    }

    const prevContent = (previousSelectedItem && previousSelectedItem.content) || '';

    const wrappedGroups = groups.map((group, i) => {
      const selectedItemInThisGroup = groupWithSelectedItemIndex === i;
      const previousSelectedItemInThisGroup = previousGroupWithSelectedItemIndex === i;

      let primaryCollapseIndexInGroup;
      if (previousSelectedItemInThisGroup) primaryCollapseIndexInGroup = previousSelectedIndexInGroup;
      if (selectedItemInThisGroup) primaryCollapseIndexInGroup = selectedIndexInGroup;

      const primaryCollapse = (
        <Collapse
          className={`content content-${primaryCollapseIndexInGroup + 1}`}
          isOpened={selectedItemInThisGroup}
        >
          {selectedItemInThisGroup && selectedItem && selectedItem.content}
          {!selectedItemInThisGroup && previousSelectedItemInThisGroup && prevContent}
        </Collapse>
      );

      const secondaryCollapse = (
        <Collapse
          className={`content content-${previousSelectedIndexInGroup + 1}`}
          isOpened={false}
        >
          {previousSelectedItemInThisGroup && prevContent}
        </Collapse>
      );

      return (
        <div key={i} className="group">
          {group}
          {this.primaryCollapseIndex === 0 ? primaryCollapse : secondaryCollapse}
          {this.primaryCollapseIndex === 0 ? secondaryCollapse : primaryCollapse}
        </div>
      );
    });

    return (
      <div className="container">
        {wrappedGroups}
      </div>
    );
  }

}

export default App;
