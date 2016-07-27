import React from 'react';
import ReactDOM from 'react-dom';
 
class Comment extends React.Component {

  constructor() {
    super();

    this.state = {}
  }


  renderTime(time) {
    if (!time || time === '0000-00-00 00:00:00') {
      return 'N/A';
    }
    return time;
  }

  renderId(id) {
    // renders the Id count
    var prefix = "0000000";
    return prefix.substring(0, prefix.length-String(id).length) + id;
  }

  renderName(name) {
    if(!name || name === ""){
      return 'Anonymous';
    }
    return name;
  }

  renderMedia(media) {
    // test for youtube
    var yt = null;
    var im = null;

    if (yt = /youtube\.com\/watch\?v\=([a-z\-0-9_]+)/ig.exec(media)) {
      var embedUrl = `https://www.youtube.com/embed/${yt[1]}`;
      return <iframe width="420" height="315" src={embedUrl} frameBorder="0" allowFullScreen></iframe>;
    }

    // test for imgur
    if (im = /https?:\/\/i?\.?imgur\.com\/([a-z_\-0-9\.]+)/ig.exec(media)) {
      var imgTag = 'imgur cannot display because you need the extension.';
      if (im[1].indexOf('.') !== -1) {
        imgTag = <img className="imgur" src={'http://i.imgur.com/'+im[1]} />;
      }
      return <p>${imgTag}</p>;
    }

    // return nothing if there's nothing found
    return null;
  }

  render() {
    let comment = this.props.data;

    return (
      <div>
        <div className="row headBox">
          <div className="two columns">{this.renderId(comment.id)}</div>
          <div className="three columns">
            {this.renderName(comment.name)}
          </div>
          <div className="four columns">{this.renderTime(comment.time)}</div>
          <div className="three columns"><button type="button">reply</button></div>
        </div>
        <div className="row commentBox">
          <div className="six columns">{this.renderMedia(comment.media)}</div>
          <div className="six columns"><p>{comment.comment}</p></div>
        </div>
      </div>
    );
  }
}

export default Comment