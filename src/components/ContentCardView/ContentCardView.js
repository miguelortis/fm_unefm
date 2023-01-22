import React from "react";
import { ContentPaste, PermContactCalendar } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import "./contentCardView.css";
import { blue } from "@mui/material/colors";

/**
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {node} Icon
 * @returns card component
 */
export default function ContentCardView({ title, subtitle, Icon, children }) {
  return (
    <Card className="card-view">
      <CardHeader
        style={{
          border: "10px solid",
          borderImageSlice: 1,
          borderWidth: "0px 0 3px 0",
          borderImageSource: "linear-gradient(to left, #fff, #1976d2)",
        }}
        avatar={
          <Avatar
            variant="rounded"
            sx={{ bgcolor: blue[300] }}
            aria-label="recipe"
          >
            {Icon ? Icon : <ContentPaste />}
          </Avatar>
        }
        title={title || "Sin Titulo"}
        titleTypographyProps={{ fontSize: 20 }}
        subheader={subtitle || "Sin Subtitulo"}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

ContentCardView.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  Icon: PropTypes.node,
  children: PropTypes.object,
};
