import { friendsOf, reducer, Store } from "./Store";

const storeInit: Store = {
  id: 0,
  users: [],
  friendShips: [],
};

test("create one user", () => {
  const newStore: Store = reducer(storeInit, {
    type: "CreateUser",
    payload: { name: "luca", friends: [] },
  });

  expect(newStore.id).toBe(1);
  expect(newStore.users.length).toBe(1);
  expect(newStore.users[0].name).toBe("luca");
  expect(newStore.friendShips.length).toBe(0);
});

test("create three users", () => {
  let newStore: Store = reducer(storeInit, {
    type: "CreateUser",
    payload: { name: "luca", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "marco", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "laura", friends: [] },
  });

  expect(newStore.id).toBe(3);
  expect(newStore.users.length).toBe(3);
  expect(newStore.users[0].name).toBe("luca");
  expect(newStore.users[1].name).toBe("marco");
  expect(newStore.users[2].name).toBe("laura");
  expect(newStore.friendShips.length).toBe(0);

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "laura", friends: [] },
  });
  expect(newStore.error).toBe("User already Exists: laura");

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 2, name: "marco", friends: [] },
  });
  expect(newStore.error).toBe("User with that name already exists: marco");
});

test("add one friendship", () => {
  let newStore: Store = reducer(storeInit, {
    type: "CreateUser",
    payload: { name: "luca", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "marco", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "laura", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 0, name: "luca", friends: [1] },
  });

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 1, name: "marco", friends: [0] },
  });

  expect(newStore.friendShips.length).toBe(1);
  // newStore = reducer(newStore, {
  //   type: "UpdateUser",
  //   payload: { id: 1, name: "marco", friends: [1] },
  // });
  // expect(newStore.error).toBe("Cannot befriend self");
});

test("remove one friendship", () => {
  let newStore: Store = reducer(storeInit, {
    type: "CreateUser",
    payload: { name: "luca", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "marco", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "CreateUser",
    payload: { name: "laura", friends: [] },
  });

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 0, name: "luca", friends: [1] },
  });

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 1, name: "marco", friends: [0, 2] },
  });

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 2, name: "laura", friends: [0, 1] },
  });

  expect(newStore.friendShips.length).toBe(3);

  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 0, name: "luca", friends: [1] },
  });

  expect(newStore.friendShips.length).toBe(2);
  expect(friendsOf(newStore, 2)).toMatchObject([1]);
  newStore = reducer(newStore, {
    type: "UpdateUser",
    payload: { id: 0, name: "luca", friends: [2] },
  });
  expect(friendsOf(newStore, 2)).toMatchObject([1, 0]);
});
