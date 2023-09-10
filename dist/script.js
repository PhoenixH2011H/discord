const Lanyard = {
  URL: {
    API: "https://api.lanyard.rest/v1/users/",
    AVATAR: "https://cdn.discordapp.com/avatars/",
    AVATAR_EXT: ".jpg",
    AVATAR_SIZE: "256"
  },
  ID: "1055944263629819954",
  IDs: {
    NICKNAME: "nickname",
    STATUS: "status",
    AVATAR: "avatar",
    ACTIVITIES: "activities"
  },
  DIV: {
    NICKNAME: "<span class='text-xl'>",
    STATUS:
      "<span class='rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-indigo-700 status " // Don't close !
  },
  STATUS: {
    ON_DISCORD: " on Discord",
    ONLINE: "Online",
    IDLE: "Idle",
    DND: "Do not disturb",
    OFFLINE: "Offline"
  },
  ACTIVITIES: {
    CURRENTLY: "I'm on ",
    NOTHING: "I'm currently doing nothing..."
  }
};

let lanyard;
let lanyardUser;
let lanyardActivities;
let statusSpan;

function innerHTML(id, data) {
  document.getElementById(id).innerHTML = data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJson(response) {
  return response.json();
}

function getAvatar(id) {
  document.getElementById(Lanyard.IDs.AVATAR).src =
    Lanyard.URL.AVATAR +
    Lanyard.ID +
    "/" +
    id +
    Lanyard.URL.AVATAR_EXT +
    "?size=" +
    Lanyard.URL.AVATAR_SIZE;
}

fetch(Lanyard.URL.API + Lanyard.ID)
  .then(checkStatus)
  .then(parseJson)
  .then(function (data) {
    lanyard = data.data;
    lanyardUser = lanyard.discord_user;
    lanyardActivities = lanyard.activities;

    console.log("Request succeeded", lanyard);

    innerHTML(
      Lanyard.IDs.NICKNAME,
      lanyardUser.global_name +
        Lanyard.DIV.NICKNAME +
        " (@" +
        lanyardUser.username +
        ")</span>"
    );
    getAvatar(lanyardUser.avatar);
    if (lanyard.discord_status === "online") {
      statusSpan = Lanyard.DIV.STATUS + " online'>";
      innerHTML(
        Lanyard.IDs.STATUS,
        statusSpan +
          Lanyard.STATUS.ONLINE +
          Lanyard.STATUS.ON_DISCORD +
          "</span>"
      );
    } else if (lanyard.discord_status === "idle") {
      statusSpan = Lanyard.DIV.STATUS + " idle'>";
      innerHTML(
        Lanyard.IDs.STATUS,
        statusDiv + Lanyard.STATUS.IDLE + Lanyard.STATUS.ON_DISCORD + "</span>"
      );
    } else if (lanyard.discord_status === "dnd") {
      statusSpan = Lanyard.DIV.STATUS + " dnd'>";
      innerHTML(
        Lanyard.IDs.STATUS,
        statusSpan + Lanyard.STATUS.DND + Lanyard.STATUS.ON_DISCORD + "</div>"
      );
    } else if (lanyard.discord_status === "offline") {
      statusSpan = Lanyard.DIV.STATUS + " offline'>";
      innerHTML(
        Lanyard.IDs.STATUS,
        statusSpan +
          Lanyard.STATUS.OFFLINE +
          Lanyard.STATUS.ON_DISCORD +
          "</span>"
      );
    } else {
      statusSpan = Lanyard.DIV.STATUS + " offline'>";
      innerHTML(
        Lanyard.IDs.STATUS,
        statusSpan +
          Lanyard.STATUS.OFFLINE +
          Lanyard.STATUS.ON_DISCORD +
          "</span>"
      );
    }

    if (lanyardActivities !== null) {
      if (lanyardActivities[0] !== null) {
        innerHTML(
          Lanyard.IDs.ACTIVITIES,
          Lanyard.ACTIVITIES.CURRENTLY + lanyardActivities[0].name
        );
      } else {
        innerHTML(Lanyard.IDs.ACTIVITIES, Lanyard.ACTIVITIES.NOTHING);
      }
    } else {
      innerHTML(Lanyard.IDs.ACTIVITIES, Lanyard.ACTIVITIES.NOTHING);
    }
  })
  .catch(function (error) {
    console.log("Request failed", error);
  });
