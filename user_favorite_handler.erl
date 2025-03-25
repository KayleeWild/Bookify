-module(user_favorite_handler).
-behaviour(cowboy_handler).
-export([init/2]).

init(Req, _State) ->
    Method = cowboy_req:method(Req),
    case Method of
        <<"POST">> ->
            {ok, Body, Req2} = cowboy_req:read_body(Req),
            {ok, Json} = jsx:decode(Body, [return_maps]),
            UserId = maps:get(<<"user_id">>, Json),
            Title = maps:get(<<"title">>, Json),
            Author = maps:get(<<"author">>, Json),
            Book = #{title => Title, author => Author},
            case book_db:add_favorite(UserId, Book) of
                ok ->
                    {ok, Resp} = cowboy_req:reply(201, #{<<"content-type">> => <<"application/json">>}, <<"{\"status\": \"Favorite added\"}">>, Req2),
                    {ok, Resp, _State};
                not_found ->
                    {ok, Resp} = cowboy_req:reply(404, Req2),
                    {ok, Resp, _State}
            end;

        <<"GET">> ->
            {ok, Query, Req2} = cowboy_req:parse_qs(Req),
            UserIdBin = proplists:get_value(<<"user_id">>, Query),
            {ok, UserId} = string:to_integer(binary_to_list(UserIdBin)),
            case book_db:get_user_favorites(UserId) of
                {ok, Favorites} ->
                    {ok, JSON} = jsx:encode(Favorites),
                    {ok, Resp} = cowboy_req:reply(200, #{<<"content-type">> => <<"application/json">>}, JSON, Req2),
                    {ok, Resp, _State};
                not_found ->
                    {ok, Resp} = cowboy_req:reply(404, Req2),
                    {ok, Resp, _State}
            end;

        _ ->
            {ok, Resp} = cowboy_req:reply(405, Req),
            {ok, Resp, _State}
    end.