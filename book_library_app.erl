-module(book_library_app).
-behaviour(application).
-export([start/2, stop/1]).

start(_Type, _Args) ->
    book_db:start(),

    %% Create a sample user on startup
    book_db:add_user(#{id => 1, name => <<"Sam">>}),

    Dispatch = cowboy_router:compile([
        {'_', [
            {"/api/user_favorites", user_favorite_handler, []}
        ]}
    ]),

    {ok, _} = cowboy:start_clear(my_http_listener,
        [{port, 8080}],
        #{env => #{dispatch => Dispatch}}),
    {ok, self()}.

stop(_State) ->
    ok.