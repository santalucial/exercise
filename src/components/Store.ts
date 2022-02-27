import { createReducerContext } from "react-use";

interface User {
  id: number;
  name: string;
}

interface FriendShip {
  from: number;
  to: number;
}

export interface Store {
  id: number;
  users: User[];
  friendShips: FriendShip[];
  error?: string;
  attemptNo?: number;
}

interface CreateUser {
  type: "CreateUser";
  payload: { name: string; friends: number[] };
}

interface UpdateUser {
  type: "UpdateUser";
  payload: User & { friends: number[] };
}

interface ClearError {
  type: "ClearError";
}

type Action = CreateUser | UpdateUser | ClearError;

const friendshipExists = (friendship: FriendShip, action: FriendShip) =>
  (friendship.from === action.from && friendship.to === action.to) ||
  (friendship.to === action.from && friendship.from === action.to);

const reducer = (oldState: Store, action: Action) => {
  const { error, attemptNo, ...state } = oldState;
  switch (action.type) {
    case "CreateUser": {
      if (
        action.payload.name === undefined ||
        action.payload.name.trim() === ""
      ) {
        return {
          ...state,
          error: `Invalid user name: "${action.payload.name}"`,
        };
      }

      if (
        state.users.find((user) => user.name === action.payload.name) !==
        undefined
      ) {
        return {
          ...state,
          error: "User already Exists: " + action.payload.name,
        };
      }

      if (process.env.NODE_ENV !== "test" && Math.random() >= 0.5) {
        return {
          ...state,
          error: `CreateUser failed${
            attemptNo === undefined ? ", retrying..." : ""
          }`,
          attemptNo: (attemptNo ?? 0) + 1,
        };
      }

      const newFriends: FriendShip[] = action.payload.friends
        .map((friend) => {
          if (
            state.friendShips.find((friendship) =>
              friendshipExists(friendship, { from: state.id, to: friend })
            ) !== undefined
          ) {
            return { from: -1, to: friend };
          }
          return { from: state.id, to: friend };
        })
        .filter((friendship) => friendship.from !== -1);

      return {
        ...state,
        id: state.id + 1,
        users: [...state.users, { id: state.id, name: action.payload.name }],
        friendShips: [...state.friendShips, ...newFriends],
      };
    }
    case "UpdateUser": {
      if (
        action.payload.name === undefined ||
        action.payload.name.trim() === ""
      ) {
        return {
          ...state,
          error: `Invalid user name: "${action.payload.name}"`,
        };
      }

      if (
        state.users.find(
          (user) =>
            user.name === action.payload.name && user.id !== action.payload.id
        ) !== undefined
      ) {
        return {
          ...state,
          error: "User with that name already exists: " + action.payload.name,
        };
      }

      if (process.env.NODE_ENV !== "test" && Math.random() >= 0.5) {
        return {
          ...state,
          error: `UpdateUser failed${
            attemptNo === undefined ? ", retrying..." : ""
          }`,
          attemptNo: (attemptNo ?? 0) + 1,
        };
      }

      const user = state.users.find((user) => user.id === action.payload.id)!;
      user.name = action.payload.name;

      const newFriends: FriendShip[] = action.payload.friends
        .filter((id) => id !== user.id)
        .map((friend) => {
          return { from: user.id, to: friend };
        });

      return {
        ...state,
        id: state.id + 1,
        users: [...state.users],
        friendShips: [
          ...state.friendShips.filter(
            (friendship) =>
              !(
                friendship.from === action.payload.id ||
                friendship.to === action.payload.id
              )
          ),
          ...newFriends,
        ],
      };
    }
    case "ClearError": {
      return {
        ...state,
      };
    }
    default:
      throw new Error();
  }
};

const [useSharedStore, SharedStoreProvider] = createReducerContext(reducer, {
  id: 2,
  users: [
    { id: 0, name: "luca" },
    { id: 1, name: "marco" },
  ],
  friendShips: [],
} as Store);

const friendsOf = (store: Store, of: number) => {
  return store.friendShips
    .filter((friendship) => friendship.from === of || friendship.to === of)
    .map((friendship) => {
      if (friendship.from === of) {
        return friendship.to;
      }
      return friendship.from;
    });
};

export { useSharedStore, SharedStoreProvider, reducer, friendsOf };
