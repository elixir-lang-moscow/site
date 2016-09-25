defmodule ElixirLangMoscow.ExAdmin.EventPartner do
  use ExAdmin.Register

  alias ElixirLangMoscow.EventPartner

  register_resource EventPartner do
    menu priority: 8

    scope :all, default: true

    query do
      %{all: [preload: [:event, :partner]]}
    end

  end
end
