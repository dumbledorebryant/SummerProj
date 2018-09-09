import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom"
// core components

const footerStyle = {
    block: {
        color: "inherit",
        padding: "15px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block",
        fontWeight: "500",
        fontSize: "12px"
    },
    left: {
        float: "left!important",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        fontSize: "14px",
        float: "right!important"
    },
    footer: {
        bottom: "0",
        borderTop: "1px solid #e7e7e7",
        padding: "15px 0",
    },
    container : {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    a: {
        textDecoration: "none",
        backgroundColor: "transparent"
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        paddingTop: "0px",
        width: "auto"
    }
};
function Footer({ ...props }) {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/">
                                Home
                            </Link>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href="/help" className={classes.block}>
                                Help
                            </a>
                        </ListItem>
                    </List>
                </div>
                <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
              Eat or not

          </span>
                </p>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
