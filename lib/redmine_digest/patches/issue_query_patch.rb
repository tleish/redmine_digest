require_dependency 'issue_query'

module RedmineDigest
  module Patches
    module IssueQueryPatch
      # Returns the journals
      # Valid options are :order, :offset, :limit
      def journals_scope
        Journal.visible.
            joins(:issue => [:project, :status]).
            where(statement).
            preload(:details, :user, {:issue => [:project, :author, :tracker, :status]})
      rescue ::ActiveRecord::StatementInvalid => e
        raise StatementInvalid.new(e.message)
      end
    end
  end
end

unless IssueQuery.included_modules.include?(RedmineDigest::Patches::IssueQueryPatch)
  IssueQuery.send :include, RedmineDigest::Patches::IssueQueryPatch
end
