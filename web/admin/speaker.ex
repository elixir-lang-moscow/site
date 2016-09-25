defmodule ElixirLangMoscow.ExAdmin.Speaker do
  use ExAdmin.Register

  alias ElixirLangMoscow.Speaker

  # TODO: why exception is raised?
  #
  # FunctionClauseError at GET /admin/event_speakers/2/edit
  # no function clause matching in Access.fetch/2

  register_resource Speaker do
    menu priority: 3

    scope :all, default: true

    query do
      %{all: []}
    end

    form admin do  # TODO: remove when the bug with ex_admin wiil be fixed
      inputs do
        input admin, :name
        input admin, :company
        # input admin, :slug, type: :text
        input admin, :avatar, type: :file
      end
    end

    show speaker do
      attributes_table do
        row :name
        row :slug
        row :company
        row "Avatar", &(img(src: Speaker.avatar_url(&1), height: 200))
      end
    end

  end
end
