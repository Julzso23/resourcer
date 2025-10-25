import { Sidebar } from "./Sidebar";

export function SettingsMenu({ onClose, closing }: {
  onClose: () => void,
  closing: boolean,
}) {
  return (
    <Sidebar onClose={onClose} closing={closing}>
      Test settings
    </Sidebar>
  )
}
