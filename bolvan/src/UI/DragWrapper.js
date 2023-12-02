const DragWrapper = (props) => {
  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    props.setData(files[0]);
  }

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} {...props}>
      {props.children}
    </div>
  );
};

export default DragWrapper;
