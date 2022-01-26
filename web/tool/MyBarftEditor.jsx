import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'

export default class MyBarftEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // editorState: BraftEditor.createEditorState(null),
            controlBarStyle_display: props.allOption.controlBarStyle_display
        }
    }
    componentWillMount() {
        const { handleDefaultValue } = this.props.allOption;

        this.setState({
            editorState: BraftEditor.createEditorState(handleDefaultValue || null)
        })


    }

    componentWillReceiveProps(nextProps) {
        const { controlBarStyle_display } = this.props.allOption;

        if (controlBarStyle_display !== nextProps.allOption.controlBarStyle_display) {
            this.setState({
                controlBarStyle_display: nextProps.allOption.controlBarStyle_display
            })
        }

    }

    handleBarftEditor = (editorState) => {//将值转换为htmlstring传给父组件
        this.props.allOption.handleBarftEditor(editorState.toHTML())
    }

    handleChange = (editorState, readOnly) => {
        this.setState({ editorState })
        if (readOnly === false) {
            this.handleBarftEditor(editorState)
        }
    }

    render() {
        const { readOnly, controlBarStyle_display, contentHeightStyle } = this.props.allOption;
        return (
            <BraftEditor value={this.state.editorState} onChange={(editorState) => this.handleChange(editorState, readOnly)}
                readOnly={readOnly} controlBarStyle={{ display: controlBarStyle_display }}
                contentStyle={{ height: contentHeightStyle || "auto" }} />
        )
    }

}