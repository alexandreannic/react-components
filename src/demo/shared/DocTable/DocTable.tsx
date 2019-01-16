import * as React from 'react'
import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((t: Theme) => ({
  root: {
    overflow: 'auto',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    color: t.palette.text.primary,
    fontSize: t.typography.body1.fontSize,
    '& $tr': {
      backgroundColor: t.palette.background.paper,
      borderTop: `1px solid ${t.palette.divider}`,
    },
    '& $td': {
      border: `1px solid ${t.palette.divider}`,
      padding: t.spacing.unit * 1.5,
    },
    '& $thead': {
      border: `1px solid ${t.palette.divider}`,
      padding: t.spacing.unit * 1.5,
      fontWeight: t.typography.fontWeightMedium,
    },
    '& $tr:nth-child(2n)': {
      backgroundColor: t.palette.background.default
    }
  },
}))

export const DocTable = ({children}: any) => {
  // @ts-ignore
  const classes = useStyles()
  return (
    <table className={classes.root}>{children}</table>
  )
}
