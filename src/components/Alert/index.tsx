import AlertWindow from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type Props = {
  error: string;
  onClose: () => void;
};

export const Alert = ({ error, onClose }: Props) => (
  <div className="alert-section">
    <Stack>
      <AlertWindow severity="error" onClose={onClose}>
        ERROR! {error}
      </AlertWindow>
    </Stack>
  </div>
);
