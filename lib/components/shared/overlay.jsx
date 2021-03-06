Components.Overlay = React.createClass({

  getDefaultProps: function () {
    return {
      alpha: 1.0
    }
  },

  componentDidMount: function () {
    this.verticallyCenter();

    var throttled = _.throttle(this.verticallyCenter, 400);
    $(window).on("resize.overlay", throttled);
  },

  componentWillUnmount: function () {
    $(window).off("resize.overlay");
  },

  verticallyCenter: function () {
    var $content = $(this.refs["content"])
      , $inner = $(this.refs["inner"])
      , contentHeight = $content.innerHeight()
      , innerHeight = $inner.outerHeight(true)
      , top = (contentHeight / 2) - (innerHeight / 2);

    top = Math.max(top, 0);

    $inner.css("top", top);
  },

  render: function () {
    var alpha = this.props.alpha
      , style = {
          background: "rgba(0, 0, 0, " + alpha + ")"
        }
      , classes = {
          "overlay-container": true
        };

    classes[this.props.className] = true;

    return (
      <div className={cx(classes)} style={style} ref="container">
        <div className="overlay-content" ref="content">
          <div className="container" ref="inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});
