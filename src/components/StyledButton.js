import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #74a585 30%, #1ed760 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        // padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            border: "none",
            boxShadow: '5px 5px 7px 2px rgba(255, 105, 135, .3)',
        }
    }
})(Button);

export default StyledButton;