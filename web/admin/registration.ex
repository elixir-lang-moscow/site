defmodule ElixirLangMoscow.ExAdmin.Registration do
  use ExAdmin.Register

  register_resource ElixirLangMoscow.Registration do
    menu priority: 4

    scope :all, default: true
    scope :upcoming, fn(q) ->
      now = Ecto.DateTime.utc

      q
      |> join(:left, [c], e in assoc(c, :event))
      |> where([p, c], c.time_at > ^now)
    end

    query do
      %{all: [preload: [:event]]}
    end

  end
end
