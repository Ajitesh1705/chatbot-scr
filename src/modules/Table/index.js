/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import { FileDownloadDoneRounded, FileDownloadRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "components";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  // MRT_FullScreenToggleButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import downloadCSV from "services/utils/downloadCSV";

function DataTable({
  data,
  columns,
  onCellClick,
  onRowClick,
  onTableActionClick,
  onEditTable,
  canEdit,
  renderMinimalTable,
  disabledIDs,
  shouldExportCSV = false,
}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
    const _isFullScreen = !isFullScreen;

    if (_isFullScreen) {
      setPagination({
        pageIndex: 0,
        pageSize: 18,
      });
    } else {
      setPagination({
        pageIndex: 0,
        pageSize: 5,
      });
    }
    setIsFullScreen(!isFullScreen);
  };

  const exportTableData = () => {
    const prefix = "export";
    const now = dayjs();
    const date = now.format("YYYYMMDD");
    const time = now.format("HHmmss");
    const fileName = `${prefix}_${date}_${time}`;
    downloadCSV(data, fileName);
  };

  const tableInstance = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showGlobalFilter: !renderMinimalTable,
      density: "compact",
      columnPinning: { right: ["mrt-row-actions"] },
    },
    enableColumnResizing: true,
    onPaginationChange: setPagination,
    state: { pagination },

    enableTopToolbar: !renderMinimalTable,
    enableSorting: !renderMinimalTable,
    enableColumnActions: false,
    enableFullScreenToggle: true,
    muiSearchTextFieldProps: {
      variant: "outlined",
      size: "small",
    },
    enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    enableEditing: canEdit,
    muiEditTextFieldProps: ({ cell }) => ({
      variant: "outlined",
      size: "small",
      error: !cell.getValue(),
      onBlur: (event) => {
        onEditTable(cell.column.id, cell.row.index, event.target.value);
      },
    }),
    editDisplayMode: "table",
    enableRowActions: !!onTableActionClick,
    renderToolbarInternalActions: ({ table }) => (
      <>
        {shouldExportCSV ? (
          <Tooltip title="Export">
            <IconButton onClick={exportTableData}>
              <FileDownloadRounded />
            </IconButton>
          </Tooltip>
        ) : null}
        {/* <MRT_ToggleDensePaddingButton table={table} /> */}
        <Box onClick={handleFullScreenToggle}>
          <MRT_ToggleFullScreenButton table={table} />
        </Box>
      </>
    ),
    enableBottomToolbar: data?.length > 8,
    muiTableBodyRowProps: ({ row }) => ({
      hover: !canEdit,
      onClick: () => {
        if (onRowClick) {
          onRowClick(row);
        }
      },
    }),
    enableRowVirtualization: data?.length > 8,
    positionActionsColumn: "last",
    positionGlobalFilter: "left",

    enableColumnPinning: true,
    autoResetPageIndex: false,
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
      showFirstButton: false,
      showLastButton: false,
    },
    paginationDisplayMode: "pages",

    muiTablePaperProps: ({ table }) => ({
      elevation: 0,
      style: {
        zIndex: table.getState().isFullScreen ? 1500 : undefined,
      },
    }),
    muiTableHeadCellProps: {
      sx: ({ typography: { size, fontWeightBold }, palette }) => ({
        color: palette.text.main,
        opacity: 0.7,
        fontSize: size.xs,
        fontWeight: fontWeightBold,
        textTransform: "capitalize",
      }),
    },

    muiTableBodyCellProps: ({ cell }) => ({
      onClick: () => {
        if (cell.column.id !== "mrt-row-actions" && onCellClick) {
          onCellClick(cell);
        }
      },
      sx: ({ typography: { size, fontWeightRegular }, palette }) => ({
        fontSize: size.sm,
        color: palette.text.main,
        fontWeight: fontWeightRegular,
        cursor: "pointer",
      }),
    }),
  });

  return <MaterialReactTable table={tableInstance} />;
}

DataTable.defaultProps = {
  columns: [],
  onRowClick: null,
  onCellClick: null,
  onTableActionClick: null,
  onEditTable: null,
  canEdit: false,
  renderMinimalTable: false,
  shouldExportCSV: false,
  disabledIDs: [],
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onTableActionClick: PropTypes.func,
  onEditTable: PropTypes.func,
  canEdit: PropTypes.bool,
  renderMinimalTable: PropTypes.bool,
  shouldExportCSV: PropTypes.bool,
  disabledIDs: PropTypes.arrayOf(PropTypes.number),
};

export default DataTable;
