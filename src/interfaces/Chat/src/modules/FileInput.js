import { Divider, Icon, List, ListItem, ListItemIcon } from "@mui/material";
import { Box, Button, Typography } from "components";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

export function FileInput({ chatController, actionRequest }) {
  const chatCtl = chatController;
  const [files, setFiles] = useState([]);

  const handleFileChange = useCallback((fileList) => {
    // Convert FileList to File[]
    const fileArray = [];
    if (fileList) {
      for (let i = 0; i < fileList.length; i += 1) {
        const file = fileList.item(i);
        if (file) {
          fileArray.push(file);
        }
      }
    }
    setFiles(fileArray);
  }, []);

  const setResponse = useCallback(() => {
    if (files.length > 0) {
      const value = files.map((f) => f.name).toString();
      const res = { type: "file", value, files };
      chatCtl.setActionResponse(actionRequest, res);
    }
  }, [actionRequest, chatCtl, files]);

  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : "Send";

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          flex: "0 0 auto",
          maxWidth: "100%",
        },
        "& > * + *": {
          mt: 1,
        },
      }}
    >
      <List>
        {files.map((f) => (
          <div key={`${f.name}-${f.size}`}>
            <Divider />
            <ListItem key={f.name}>
              <ListItemIcon>
                <Icon>attach_file</Icon>
              </ListItemIcon>
              <Typography style={{ overflowWrap: "break-word", minWidth: 0 }}>{f.name}</Typography>
            </ListItem>
          </div>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            flex: "1 1 auto",
            minWidth: 0,
          },
          "& > * + *": {
            ml: 1,
          },
        }}
      >
        <Button
          disabled={false}
          component="label"
          variant="contained"
          color="primary"
          startIcon={<Icon>folder</Icon>}
        >
          Select file
          <input
            type="file"
            accept={actionRequest.accept}
            multiple={actionRequest.multiple}
            onChange={(e) => handleFileChange(e.target.files)}
            style={{ display: "none" }}
          />
        </Button>
        <Button
          type="button"
          onClick={setResponse}
          disabled={files.length === 0}
          variant="contained"
          color="primary"
          startIcon={<Icon>send</Icon>}
        >
          {sendButtonText}
        </Button>
      </Box>
    </Box>
  );
}

FileInput.propTypes = {
  chatController: PropTypes.object.isRequired,
  actionRequest: PropTypes.object.isRequired,
};

export default FileInput;
