import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type Props = {
  error: string;
  onClose: () => void;
};

export const AlertWindow = ({ error, onClose }: Props) => {
  return (
    <div className="alert-section">
      <Stack>
        <Alert severity="error" onClose={onClose}>
          ERROR! {error}
        </Alert>
      </Stack>
    </div>
  );
};
