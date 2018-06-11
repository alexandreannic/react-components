import * as React from 'react';
import {ReactElement} from 'react';
import {Collapse, createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core';
import {colorSuccess} from '../style/color';

const animationDuration = 300;

const styles = (t: Theme) => createStyles({
  root: {
    '&:not(:first-of-type)': {
      borderTop: `1px solid ${t.palette.divider}`,
    }
  },
  header: {
    padding: `0 ${t.spacing.unit * 3}`,
    height: 68,
    display: 'flex',
    alignItems: 'center',
    fontSize: t.typography.title.fontSize,
    cursor: 'pointer',
  },
  i: {
    fontWeight: t.typography.fontWeightMedium,
    borderRadius: '50%',
    color: colorSuccess,
    marginRight: t.spacing.unit,
  },
  body: {
    transition: t.transitions.create('all'),
    overflow: 'hidden',
  },
  content: {
    padding: `0 ${t.spacing.unit * 3} ${t.spacing.unit * 3} ${t.spacing.unit * 3}`
  }
});

interface Props extends WithStyles<typeof styles> {
  readonly label: string;
  readonly component: ReactElement<any>;

  // Props from ExpensionStepper
  readonly prev?: () => void;
  readonly next?: () => void;
  readonly goTo?: (i: number) => void;
  readonly free?: boolean;
  readonly index?: number;
  readonly disabled?: boolean;
  readonly isCurrent?: boolean;
  readonly isLast?: boolean;
}

class ExpensionStep extends React.Component<Props, {}> {

  private $root: HTMLElement;

  render() {
    const {disabled, free, isCurrent, index, label, component, goTo, classes} = this.props;
    return (
      <main className={classes.root} ref={node => this.$root = node}>
        <header className={classes.header} onClick={() => goTo(index)}>
          {!free && !disabled && !isCurrent && <Icon className={classes.i}>check</Icon>}
          {index + 1}. {label}
        </header>
        <Collapse in={isCurrent} timeout={animationDuration} className={classes.body}>
          <div className={classes.content}>
            {React.cloneElement(component, {...this.props})}
          </div>
        </Collapse>
      </main>
    );
  }

  componentDidUpdate(prevProps: any) {
    if (!prevProps.isCurrent && this.props.isCurrent)
      setTimeout(() => this.scrollTop(), animationDuration);
  }

  private scrollTop = () => {
    this.$root.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

export default withStyles(styles)(ExpensionStep);
