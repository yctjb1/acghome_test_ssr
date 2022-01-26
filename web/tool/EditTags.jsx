import React from 'react';
import { Tag, Input, message } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

export default class EditTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.prevTags,
            inputVisible: false,
            inputValue: '',

        }
    }
    componentDidMount() {

    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        if (tags.length < 1 && this.props.tagType === "01") {
            message.warning("删除标签失败，至少需要一个用户自定义标签!")
        } else {

            this.setState({ tags });
            //需要返回父
            this.props.updateTags(tags, this.props.tagType)
        }
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        // console.log(tags);
        //需要返回父
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
        this.props.updateTags(tags, this.props.tagType)
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
                color={this.props.tagType === "00" ? "#f50" : "#2db7f5"}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <div style={{ marginBottom: 8 }}>
                <div style={{ marginBottom: 8 }}>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: e => {
                                e.target.style = '';
                            },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                </div>
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (tags.length < 5) && (
                    <Tag onClick={this.showInput} style={{ background: "#fff", borderStyle: "dashed" }}>
                        <PlusOutlined /> {this.props.tagType === "01" ? "普通新标签" : "系统新标签"}
                    </Tag>
                )}
            </div>
        );
    }
}