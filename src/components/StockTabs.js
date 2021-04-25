import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ValueStockTable from "../containers/Tables/SticodevamTables/ValueStockTable";
import ValueStockTableTotal from "../containers/Tables/SticodevamTables/ValueStockTableTotal";
import MemberStockTable from "../containers/Tables/SticodevamTables/MemberStockTable";
import MemberStockTableTotal from "../containers/Tables/SticodevamTables/MemberStockTableTotal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs({
  stocks,
  totalValueStocks,
  totalMemberStocks,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Tableau par Valeur" {...a11yProps(0)} />
          <Tab label="Tableau par Adhérent" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ValueStockTable stocks={stocks} />
        <ValueStockTableTotal totalValueStocks={totalValueStocks} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MemberStockTable stocks={stocks} />
        <MemberStockTableTotal totalMemberStocks={totalMemberStocks} />
      </TabPanel>
    </div>
  );
}
