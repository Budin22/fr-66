import React, { memo } from "react";

import { RegistrationForm } from "./RegistrationFrom";
import { ProfileInfo } from "./ProfileInfo";
import { useSelectorAll } from "../../hooks/useSelectorAll";

export const ProfileView = memo(() => {
  const {
    user: {
      activeUser: { email },
    },
  } = useSelectorAll();

  return (
    <>{!!email ? <ProfileInfo /> : <RegistrationForm />}</>
  );
});
