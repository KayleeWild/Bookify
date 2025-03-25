-module(book_handler).
-behaviour(cowboy_handler).
-export([init/2]).

init(Req, _State) ->
    Method = cowboy_req:method(Req),
    case Method of
        <<"GET">> ->
            Books = book_db:get_books(),
            {ok, JSON} = jsx:encode(Books),
            {ok, Resp} = cowboy_req:reply(200, #{<<"content-type">> => <<"application/json">>}, JSON, Req),
            {ok, Resp, _State};
        _ ->
            {ok, Resp} = cowboy_req:reply(405, Req),
            {ok, Resp, _State}
    end.
