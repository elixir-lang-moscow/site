defmodule ElixirLangMoscow.ExAdmin.Speaker do
  use ExAdmin.Register

  alias ElixirLangMoscow.Speaker

  register_resource Speaker do
    menu priority: 3

    scope :all, default: true

    query do
      %{all: []}
    end

    show speaker do
      attributes_table do
        row :name
        row :slug
        row :company
        row "Avatar", &(img(src: Speaker.avatar_url(&1), height: 250))
      end
    end

  end
end
