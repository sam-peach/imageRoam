import React from 'react'
import {Button} from './index'
import axios from 'axios'
import ReactJson from 'react-json-view'

class UploadFrom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: null,
      processed: false,
      jsonData: []
    }
  }

  handleChange = evt => {
    this.setState({imageFile: URL.createObjectURL(evt.target.files[0])})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const files = Array.from(document.querySelector('[type=file').files)
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onloadend = async () => {
      const base64Data = reader.result.replace(/^data:image\/\w+;base64,/, '')
      const {data} = await axios.post('/api/imageProcessing', {
        clientData: base64Data
      })
      this.setState({jsonData: data})
    }
    // const base64Data = window.btoa(files[0])
    // const formData = new FormData()
    // files.forEach((file, i) => {
    //   formData.append(i, file)
    // })
    // const {data} = await axios({
    //   method: 'post',
    //   url: '/api/imageProcessing',
    //   data: formData,
    //   config: {headers: {'Content-Type': "'multipart/form-data'"}}
    // })
    // console.log('DATA>>> ', this.state.imageFile)
    // this.setState({jsonData: data})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            name="files[]"
            accept="image/png, image/jpeg"
            onChange={this.handleChange}
          />
          <Button type="submit" value="Submit" />
        </form>
        {/* {this.state.processed ? <Canvas /> : <img src={this.state.imageFile} />} */}
        {this.state.jsonData.length ? (
          <ReactJson
            src={this.state.jsonData}
            theme="bespin"
            collapsed={true}
          />
        ) : (
          false
        )}
      </div>
    )
  }
}

export default UploadFrom
