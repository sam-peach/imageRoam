import React from 'react'
import {Button} from './index'
import axios from 'axios'
import {imgur} from '../../secrets'

class UploadFrom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: null
    }
  }

  handleChange = evt => {
    this.setState({imageFile: URL.createObjectURL(evt.target.files[0])})
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    const files = Array.from(document.querySelector('[type=file').files)

    const formData = new FormData()
    files.forEach((file, i) => {
      formData.append(i, file)
    })
    const {data} = await axios({
      method: 'post',
      url: '/api/image',
      data: formData,
      config: {headers: {'Content-Type': "'multipart/form-data'"}}
    })
    console.log('DATA>>> ', data)
    this.setState({imageFile: data})
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
        <img src={this.state.imageFile} />
      </div>
    )
  }
}

export default UploadFrom
