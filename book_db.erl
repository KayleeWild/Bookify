-module(book_db).
-export([start/0, add_user/1, get_user/1, add_favorite/2, get_user_favorites/1]).

start() ->
    ets:new(users, [named_table, set, public, {keypos, 2}]),
    ok.

add_user(User) ->
    ets:insert(users, {user, maps:get(id, User), User#{favorites => []}}),
    ok.

get_user(UserId) ->
    case ets:lookup(users, UserId) of
        [{user, _, User}] -> {ok, User};
        [] -> not_found
    end.

add_favorite(UserId, Book) ->
    case ets:lookup(users, UserId) of
        [{user, _, User}] ->
            OldFavs = maps:get(favorites, User, []),
            NewFavs = [Book | OldFavs],
            NewUser = User#{favorites => NewFavs},
            ets:insert(users, {user, UserId, NewUser}),
            ok;
        [] -> not_found
    end.

get_user_favorites(UserId) ->
    case ets:lookup(users, UserId) of
        [{user, _, User}] -> {ok, maps:get(favorites, User, [])};
        [] -> not_found
    end.