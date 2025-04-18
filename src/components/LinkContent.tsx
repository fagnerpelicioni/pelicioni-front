import { Typography } from "@mui/material";

import { UserLink } from "../Interfaces";

const LinkContent = ({item} : {item: UserLink}) => {
  return (
    <div style={{ height: "100%" }}>
      <Typography variant="h4" style={{ margin: "1rem" }}>{item.name}</Typography>
      {/* <iframe width="100%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiMDExMGFkMDQtNjYzMS00ZWM5LTk3NjItMWFmMGMyNmNmYzM0IiwidCI6ImFlNjI2OGY0LWViNmItNDRlZC05M2QwLTdmNzMyMDRjMzk1ZSJ9" frameBorder="0" allowFullScreen={true}></iframe> */}
      <iframe width="100%" height="100%" src={item.link} frameBorder="0" allowFullScreen={true}></iframe>
    </div>
  );
}
export default LinkContent;