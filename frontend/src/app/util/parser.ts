

export const getRoles = (roles: number[] | string[]) => {
    let role = "";

    for (const index in roles) {
      if(roles[index] === 0 || roles[index] === "0") {
        role += "Auditor "
      } else if (roles[index] === 1 || roles[index] === "1") {
        role += "Editor "
      } else if (roles[index] === 2 || roles[index] === "2") {
        role += "Subscriber "
      } else if (roles[index] === 3 || roles[index] === "3") {
        role += "Administrator "
      }
    } 

    return role;
  };