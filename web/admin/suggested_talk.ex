defmodule ElixirLangMoscow.ExAdmin.SuggestedTalk do
  use ExAdmin.Register

  register_resource ElixirLangMoscow.SuggestedTalk do
    menu priority: 5

    scope :all, default: true
    scope :seen, fn(q) ->
      where(q, [p], p.seen == true)
    end
    scope :unseen, fn(q) ->
      where(q, [p], p.seen == false)
    end
  end
end
