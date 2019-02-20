import * as React from 'react'
import {Avatar, Chip, CircularProgress, createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core'
import {Btn} from '../Btn'
import {colorError} from '../style/color'
import classNames from 'classnames'
import {ButtonProps} from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/styles'
import {useRef, useState} from 'react'

const useStyles = makeStyles((t: Theme) => ({
  root: {
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
  },
  doc: {},
  doc_i: {
    color: t.palette.text.secondary,
    fontSize: t.typography.subheading.fontSize,
  },
  doc_progress: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  docUploading: {
    color: t.palette.text.disabled,
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: t.spacing.unit,
    color: colorError,
    padding: `${t.spacing.unit} ${t.spacing.unit * 2}`,
    borderRadius: 2,
  },
  error_i: {
    marginRight: t.spacing.unit
  },
  error_reset: {
    marginLeft: t.spacing.unit,
    cursor: 'pointer',
  }
}))

interface Document {
  permalink: string
  name: string
}

interface Messages {
  loading: string
  upload: string
  invalidSize: string
}

interface Props extends Pick<ButtonProps, Exclude<keyof ButtonProps, keyof {classes}>> {
  document?: Document
  msg?: Messages
  uploading?: boolean
  maxUploadFileSize?: number
  onDelete: () => void
  onUpload: (f: File) => void
}

const defaultMsg = {
  loading: 'Loading...',
  upload: 'Upload',
  invalidSize: 'File is too big',
}

// TODO(Alex) Fix wierd typing issue (it works for <Btn>)
export const BtnUploader = ({document, uploading, msg = defaultMsg, onUpload, onDelete, maxUploadFileSize, ...other}: Props) => {
  // @ts-ignore
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const fileInputEl = useRef<HTMLInputElement>(null)

  const openFileSelection = () => {
    fileInputEl.current!.click()
  }

  const handleChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    const file = files[0]
    // const {maxUploadFileSize, onUpload, msg} = props
    if (maxUploadFileSize && file.size > maxUploadFileSize * 1024 * 1024) {
      setErrorMessage(msg.invalidSize)
      return
    }
    onUpload(file)
  }

  const clear = () => {
    onDelete()
  }

  const renderBody = () => {
    if (uploading) {
      return (
        <Chip className={classNames(classes.doc, classes.docUploading)} label={msg.loading} avatar={
          <Avatar>
            <CircularProgress size={32} className={classes.doc_progress}/>
            <Icon className={classes.doc_i}>insert_drive_file</Icon>
          </Avatar>
        }/>
      )
    } else {
      if (document) {
        return (
          <Chip
            className={classes.doc} label={document.name}
            onDelete={clear} onClick={() => window.open(document.permalink, '_blank')}
            avatar={
              <Avatar>
                <Icon className={classes.doc_i}>insert_drive_file</Icon>
              </Avatar>
            }
          />
        )
      } else {
        return (
          <Btn color="primary" onClick={openFileSelection} icon="file_upload" {...other}>
            {msg.upload}
            <input style={{display: 'none'}} type="file" ref={fileInputEl}
                   onChange={e => handleChange(e.target.files)}/>
          </Btn>
        )
      }
    }
  }

  return (
    <div className={classes.root}>
      {renderBody()}
      {errorMessage &&
      <div className={classes.error}>
        <Icon className={classes.error_i}>warning</Icon>
        {errorMessage}
        <Icon className={classes.error_reset}
              onClick={() => setErrorMessage('')}>clear</Icon>
      </div>
      }
    </div>
  )
}