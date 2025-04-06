interface Link {
    name: string;
    link: string;
};

const LinkContent = ({item} : {item: Link}) => {
  return (
    <div style={{ height: "100%" }}>
      <h1>{item.name}</h1>
      {/* <iframe width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiMDExMGFkMDQtNjYzMS00ZWM5LTk3NjItMWFmMGMyNmNmYzM0IiwidCI6ImFlNjI2OGY0LWViNmItNDRlZC05M2QwLTdmNzMyMDRjMzk1ZSJ9" frameBorder="0" allowFullScreen={true}></iframe> */}
      <iframe width="100%" height="100%" src={item.link} frameBorder="0" allowFullScreen={true}></iframe>
    </div>
  );
}
export default LinkContent;