#!/usr/bin/perl

use warnings;
use strict;

package Horse;

sub new
{
  my $class = shift();

  my $self = {
    name => shift(),
    colour => shift(),
    number => shift()
  };

  bless($self, $class);

  return $self;
}

package main;

use Net::WebSocket::Server;

Net::WebSocket::Server->new(
    listen => 8080,
    on_connect => sub {
        my ($serv, $conn) = @_;
        $conn->on(
            utf8 => sub {
                my ($conn, $msg) = @_;
                $_->send_utf8($msg) for $conn->server->connections;
            },
            binary => sub {
                my ($conn, $msg) = @_;
                $_->send_binary($msg) for $conn->server->connections;
            },
        );
    },
)->start;
