import { Modal, Fade, Box } from "@mui/material"
import LoanProLinear from "../Linear/LoanProLinear/LoanProLinear"
import { FC, PropsWithChildren } from "react"
import { ModalWrapperProps } from "./types"

const ModalWrapper: FC<PropsWithChildren<ModalWrapperProps>> = ({ open, handleClose, children }) => {
    return (
        <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3
          }}
        >
          <LoanProLinear radius />
          <Box sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
          }}>
            {children}
          </Box>
          </Box>
          </Fade>
          </Modal>
    )
}

export default ModalWrapper;