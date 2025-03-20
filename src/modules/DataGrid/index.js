/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { Box, Chip, Stack, useTheme } from "@mui/material";
import colors from "assets/theme/base/colors";
import { Loader, Typography } from "components";
import DataTable from "modules/Table";
import React, { useEffect, useMemo } from "react";
import { usePostQueryMutation } from "store/services/queryApi";

function DataGrid({ chatCtl, input, handleRecommendationClick }) {
  const [postQuery, postQueryStates] = usePostQueryMutation();
  const { data, status, error } = postQueryStates;

  const postUserResponse = async (response) => {
    const requestBody = {
      query: response.value,
      mock: 1,
    };
    try {
      const res = await postQuery(requestBody).unwrap();
      return res;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (input) {
      postUserResponse(input);
    }
  }, [input]);

  const {
    functions: { pxToRem },
  } = useTheme();

  const columns = useMemo(() => {
    if (!data?.answer?.result?.length) return [];
    return Object.keys(data?.answer?.result[0]).map((key) => ({
      id: key,
      header: key,
      accessorKey: key,
    }));
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      {status === "rejected" && (
        <Typography variant="subtitle1" style={{ whiteSpace: "pre-wrap" }} color="text">
          {error?.data?.message || error.message || error || "Something went wrong"}
        </Typography>
      )}
      {status === "pending" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "inherit",
            height: "100px",
          }}
        >
          <Loader toggle={status === "pending"} color="secondary" type="circular" />
        </Box>
      )}
      <Box mt={pxToRem(20)} width="100%">
        {status === "fulfilled" && (
          <DataTable columns={columns} data={data?.answer?.result} shouldExportCSV />
        )}
      </Box>
      {status === "fulfilled" && data?.answer?.recommendations?.length > 0 && (
        <Stack
          direction="row"
          sx={{
            mt: 4,
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {data?.answer?.recommendations?.map((rec, index) => (
            <Chip
              key={index}
              label={rec}
              onClick={() => handleRecommendationClick(rec)}
              sx={{
                backgroundColor: colors.secondary.focus,
                color: colors.text.main,
                "&:hover": {
                  backgroundColor: colors.secondary.main,
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default DataGrid;
